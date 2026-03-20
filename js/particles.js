(function () {
  const options = {
    background: {
      color: {
        value: "transparent"
      }
    },
    fullScreen: {
      enable: true,
      zIndex: 0
    },
    detectRetina: true,
    fpsLimit: 120,
    interactivity: {
      detectsOn: "window",
      events: {
        onClick: {
          enable: true,
          mode: "push"
        },
        onHover: {
          enable: true,
          mode: "grab",
          parallax: {
            enable: true,
            force: 50,
            smooth: 15
          }
        },
        resize: {
          enable: true,
          delay: 0.5
        }
      },
      modes: {
        grab: {
          distance: 250,
          links: {
            opacity: 0.5
          }
        },
        push: {
          quantity: 4
        }
      }
    },
    particles: {
      color: {
        value: "#ffffff"
      },
      links: {
        enable: true,
        color: {
          value: "#ffffff"
        },
        distance: 150,
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        direction: "none",
        outModes: {
          default: "out"
        },
        speed: 0.6
      },
      number: {
        density: {
          enable: true,
          width: 1920,
          height: 1080
        },
        value: 150
      },
      opacity: {
        value: {
          min: 0.1,
          max: 0.5
        },
        animation: {
          enable: true,
          speed: 1.2,
          sync: false,
          startValue: "random"
        }
      },
      shape: {
        type: "circle"
      },
      size: {
        value: {
          min: 1,
          max: 5
        },
        animation: {
          enable: true,
          speed: 8,
          sync: false,
          startValue: "random"
        }
      }
    },
    pauseOnBlur: true,
    pauseOnOutsideViewport: true,
    motion: {
      disable: true,
      reduce: {
        factor: 100,
        value: true
      }
    }
  };

  async function initParticles() {
    if (typeof tsParticles === "undefined") {
      return;
    }

    if (typeof loadSlim === "function") {
      await loadSlim(tsParticles);
    }

    await tsParticles.load({
      id: "tsparticles",
      options
    });
  }

  initParticles().catch(console.error);
})();
