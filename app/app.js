import Ui from "./module/ui.js";
import card from "./components/card.js";

function home() {
  return Ui.material({
    design: {
      div: [
        {
          child: card(Ui, { name: "anjai" }),
        },
      ],
    },
  });
}

Ui.run(home());
