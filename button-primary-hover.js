document.addEventListener('DOMContentLoaded', function() {
  // ====== LEFT PATHS ======
  const pathLeftNormal = "M0 6.00663C0 2.69304 2.6861 0.0068031 5.99969 0.00663039L133.192 8.21921e-07C137.255 -0.000210949 140.143 3.95302 138.909 7.82374L129.975 35.8236C129.181 38.311 126.87 39.9997 124.259 39.9998L6.00034 40.0066C2.6865 40.0068 0 37.3204 0 34.0066V6.00663Z";
  
  const pathLeftHover = "M0 6.00682C0 2.69325 2.68608 0.00701673 5.99965 0.00682571L124.256 8.56362e-06C126.867 -0.000141959 129.179 1.6884 129.973 4.17592L138.908 32.1761C140.143 36.0467 137.255 40 133.192 40.0002L6.00032 40.0069C2.68649 40.007 0 37.3207 0 34.0069V6.00682Z";
  
  // ====== RIGHT PATHS ======
  const pathRightNormal = "M41.7979 34C41.7979 37.3137 39.1116 39.9999 35.7979 40L6.00435 40.0002C1.94151 40.0002 -0.946735 36.0471 0.288193 32.1764L9.22165 4.17646C10.0153 1.68891 12.3266 0.000225067 14.9377 0.000198364L35.7978 -1.90735e-05C39.1115 -5.34058e-05 41.7979 2.68625 41.7979 5.99998V34Z";
  
  const pathRightHover = "M41.7979 34.0001C41.7979 37.3138 39.1116 40.0001 35.798 40.0001L14.9379 40.0006C12.3267 40.0007 10.0153 38.312 9.22161 35.8244L0.288123 7.82398C-0.946777 3.95341 1.94141 0.000278416 6.0042 0.00024848L35.7978 2.89515e-05C39.1115 4.53488e-06 41.7979 2.6863 41.7979 6.00003V34.0001Z";
  
  // Seleccionar TODOS los botones
  const buttons = document.querySelectorAll('.button_primary');
  
  // Iterar sobre cada botón
  buttons.forEach((button, index) => {
    // Buscar los paths específicos de este botón
    const mainPathLeft = button.querySelector('[id^="left-main-path"]');
    const clipPathLeft = button.querySelector('[id^="left-clip-path"]');
    const mainPathRight = button.querySelector('[id^="right-main-path"]');
    
    // Verificar que existen los elementos necesarios
    if (mainPathLeft && clipPathLeft && mainPathRight) {
      // Hover IN
      button.addEventListener('mouseenter', function() {
        // Animar LEFT
        gsap.to([mainPathLeft, clipPathLeft], {
          attr: { d: pathLeftHover },
          duration: 0.25,
          ease: "power2.inOut"
        });
        
        // Animar RIGHT
        gsap.to(mainPathRight, {
          attr: { d: pathRightHover },
          duration: 0.75,
          ease: "power2.inOut"
        });
      });
      
      // Hover OUT
      button.addEventListener('mouseleave', function() {
        // Animar LEFT
        gsap.to([mainPathLeft, clipPathLeft], {
          attr: { d: pathLeftNormal },
          duration: 0.25,
          ease: "power2.inOut"
        });
        
        // Animar RIGHT
        gsap.to(mainPathRight, {
          attr: { d: pathRightNormal },
          duration: 0.75,
          ease: "power2.inOut"
        });
      });
    } else {
      console.warn(`Botón ${index + 1}: No se encontraron todos los paths necesarios`);
    }
  });
});
