export const getTemplate = (id) => {
  const template = {
    title: {
      fontSize: 72,
      fontFamily: "Raleway",
      color: "#fff",
      fontWeight: 700,
      text: "My Awesome Post Title Goes Here",
      lineHeight: 80,
    },
    tagline: {
      fontSize: 35,
      fontFamily: "Playfair-Display",
      color: "#ddd",
      fontWeight: 300,
      text: "written by @saviomartin",
      lineHeight: 60,
    },
    background: {
      type: "gradient",
      color1: "#FF00CC",
      color2: "#333399",
      direction: 105,
    },
    icon: {
      name: "react",
      color: "#4A90E2",
      fontSize: 125,
    },
  };

  return template;
};
