const Ui = {
  material: (config) => {
    const element = document.createElement(config.tag || "div");

    if (config.design) {
      for (const tag in config.design) {
        const childConfigList = config.design[tag];

        if (Array.isArray(childConfigList)) {
          childConfigList.forEach((childConfig) => {
            const childElement = document.createElement(tag);

            if (
              typeof childConfig === "string" ||
              typeof childConfig === "number"
            ) {
              childElement.innerHTML = childConfig.toString();
            } else if (childConfig instanceof HTMLElement) {
              // Jika childConfig adalah elemen DOM, langsung tambahkan ke childElement
              childElement.appendChild(childConfig);
            } else if (typeof childConfig === "object") {
              for (const prop in childConfig) {
                if (prop === "class") {
                  childElement.className = childConfig[prop];
                } else if (prop === "style" && typeof childConfig[prop] === "object") {
                  // Menangani properti style
                  const styles = childConfig[prop];
                  for (const styleKey in styles) {
                    childElement.style[styleKey] = styles[styleKey];
                  }
                } else if (prop === "child") {
                  if (
                    typeof childConfig[prop] === "string" ||
                    typeof childConfig[prop] === "number"
                  ) {
                    childElement.innerHTML = childConfig[prop].toString();
                  } else if (Array.isArray(childConfig[prop])) {
                    const nestedChildElement = Ui.material({
                      design: { [tag]: childConfig[prop] },
                    });
                    childElement.appendChild(nestedChildElement);
                  } else if (childConfig[prop] instanceof HTMLElement) {
                    // Jika childConfig[prop] adalah elemen DOM, langsung tambahkan ke childElement
                    childElement.appendChild(childConfig[prop]);
                  } else if (typeof childConfig[prop] === "object") {
                    const nestedChildElement = Ui.material({
                      design: childConfig[prop],
                    });
                    childElement.appendChild(nestedChildElement);
                  }
                } else {
                  childElement.setAttribute(prop, childConfig[prop]);
                }
              }
            }

            element.appendChild(childElement);
          });
        }
      }
    }
    return element;
  },

  run: (container) => {
    document.getElementById("root").innerHTML = "";
    document.getElementById("root").appendChild(container);
  },
};

export default Ui;
