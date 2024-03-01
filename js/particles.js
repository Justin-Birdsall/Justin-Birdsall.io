window.onload= function() {
    Particles.init({
    // normal options
    selector: '.background',
      
    // options for breakpoints
      responsive: [
        { breakpoint: 4000,options: {maxParticles: 70, connectParticles: true}}, 
        {breakpoint: 768, options: {maxParticles: 45, connectParticles: false }}, 
        { breakpoint: 320 , options: { maxParticles: 0 }}
      ]
    });
    };