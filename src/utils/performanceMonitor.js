/**
 * Monitor de Rendimiento para desarrollo
 * Permite trackear FPS, memory usage y render performance
 */

class PerformanceMonitor {
  constructor() {
    this.fps = 0;
    this.lastTime = performance.now();
    this.frames = 0;
    this.memoryUsage = 0;
    this.isEnabled = false;
    this.displayElement = null;
  }

  // Iniciar monitor
  start() {
    if (this.isEnabled) return;
    
    this.isEnabled = true;
    this.createDisplay();
    this.measure();
    
    console.log('📊 Performance Monitor iniciado');
  }

  // Detener monitor
  stop() {
    this.isEnabled = false;
    if (this.displayElement) {
      this.displayElement.remove();
      this.displayElement = null;
    }
    
    console.log('📊 Performance Monitor detenido');
  }

  // Crear elemento de display
  createDisplay() {
    if (this.displayElement) return;
    
    this.displayElement = document.createElement('div');
    this.displayElement.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      background: rgba(0, 0, 0, 0.8);
      color: #00ff00;
      padding: 10px;
      font-family: monospace;
      font-size: 12px;
      z-index: 999999;
      border-radius: 4px;
      min-width: 200px;
    `;
    
    document.body.appendChild(this.displayElement);
  }

  // Medir rendimiento
  measure() {
    if (!this.isEnabled) return;
    
    requestAnimationFrame(() => {
      const currentTime = performance.now();
      this.frames++;
      
      // Calcular FPS cada segundo
      if (currentTime >= this.lastTime + 1000) {
        this.fps = Math.round((this.frames * 1000) / (currentTime - this.lastTime));
        this.frames = 0;
        this.lastTime = currentTime;
        
        // Obtener memoria si está disponible
        if (performance.memory) {
          this.memoryUsage = Math.round(performance.memory.usedJSHeapSize / 1048576);
        }
        
        this.updateDisplay();
      }
      
      this.measure();
    });
  }

  // Actualizar display
  updateDisplay() {
    if (!this.displayElement) return;
    
    const fpsColor = this.fps >= 50 ? '#00ff00' : this.fps >= 30 ? '#ffff00' : '#ff0000';
    const memoryInfo = performance.memory 
      ? `<div>Memory: ${this.memoryUsage} MB</div>` 
      : '';
    
    this.displayElement.innerHTML = `
      <div style="color: ${fpsColor}; font-weight: bold;">FPS: ${this.fps}</div>
      ${memoryInfo}
      <div>Render: ${document.querySelectorAll('canvas').length} canvas</div>
      <div style="margin-top: 5px; font-size: 10px; color: #888;">
        Press 'P' to toggle
      </div>
    `;
  }

  // Toggle con tecla
  setupKeyboardToggle() {
    document.addEventListener('keydown', (e) => {
      if (e.key.toLowerCase() === 'p' && !e.ctrlKey && !e.metaKey) {
        if (this.isEnabled) {
          this.stop();
        } else {
          this.start();
        }
      }
    });
  }
}

// Crear instancia global
const perfMonitor = new PerformanceMonitor();

// Setup keyboard toggle
if (typeof window !== 'undefined') {
  perfMonitor.setupKeyboardToggle();
}

// Auto-start en development
if (import.meta.env.DEV) {
  perfMonitor.start();
  console.log('💡 Tip: Presiona "P" para toggle del monitor de rendimiento');
}

// Exportar funciones útiles
export const startPerformanceMonitor = () => perfMonitor.start();
export const stopPerformanceMonitor = () => perfMonitor.stop();

export default perfMonitor;
