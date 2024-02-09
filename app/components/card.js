export default function card(Ui, { name }) {
  return Ui.material({
    design: {
      div: [
        {
          class: "app-container",
          child: `nama saya ${name}`,
          style: {
            color: "blue",
            backgroundColor: "aqua",
            fontFamily: " 'Courier New', Courier, monospace",
          },
        },
      ],
    },
  });
}
