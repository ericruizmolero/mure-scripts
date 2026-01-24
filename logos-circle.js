document.addEventListener('DOMContentLoaded', function() {
  const circle = document.querySelector('.back_circle');
  const logoWraps = document.querySelectorAll('.back_logo-wrap');
  
  let targetRotation = 0;
  let autoRotateSpeed = 12; // 12 grados por segundo (360/30)
  let lastTime = Date.now();
  let draggableInstance;
  
  // Loop principal que SIEMPRE corre
  function animate() {
    const currentTime = Date.now();
    const deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;
    
    // Si el draggable NO está siendo presionado ni tiene throw activo
    if (draggableInstance && !draggableInstance.isDragging && !draggableInstance.isThrowing) {
      targetRotation += autoRotateSpeed * deltaTime;
    } else if (draggableInstance) {
      // Si está siendo arrastrado o con inercia, usar su rotación
      targetRotation = draggableInstance.rotation;
    }
    
    // Aplicar rotaciones
    gsap.set(circle, { rotation: targetRotation });
    gsap.set(logoWraps, { rotation: -targetRotation });
    
    requestAnimationFrame(animate);
  }
  
  // Crear draggable con alta sensibilidad
  draggableInstance = Draggable.create(circle, {
    type: "rotation",
    inertia: true,
    throwResistance: 5, // Muy baja resistencia
    maxDuration: 20, // Puede girar mucho tiempo
    minDuration: 2,
    overshootTolerance: 0,
    cursor: "grab",
    activeCursor: "grabbing",
    onPress: function() {
      circle.style.cursor = "grabbing";
    },
    onRelease: function() {
      circle.style.cursor = "grab";
    }
  })[0];
  
  // Iniciar animación
  circle.style.cursor = "grab";
  animate();
});
