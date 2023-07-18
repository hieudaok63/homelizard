export const objectStyleOptions = [
  "bohemian",
  "coastal-hamptons",
  "contemporary",
  "french-country",
  "hollywood-glam",
  "Industrial",
  "mid-century-modern",
  "minimalistic",
  "modern",
  "rustic",
  "scandinavian",
  "shabby-chic",
  "traditional",
  "transitional",
] as const;

export type ObjectStyleOption = (typeof objectStyleOptions)[number];

export type ObjectStyle = {
  id: ObjectStyleOption;
  title: string;
  description: string;
  imageUrl: string;
};

export const objectStyles: ObjectStyle[] = [
  {
    id: "bohemian",
    title: "Bohemian",
    description:
      "A popular style among those who want homes full of life & culture, and as a reflection of their carefree lifestyle. Bohemian home décor may integrate vintage furniture, light fixtures, globally collected textiles and rugs, finds and accoutrements from flea markets and exotic locations. The Bohemian style provides a relaxed attitude where one can combine everything as you like it.",
    imageUrl: "/image/object-style/Bohemian.jpg",
  },
  {
    id: "coastal-hamptons",
    title: "Coastal-hamptons",
    description:
      "Coastal style, also referred to as Hamptons style, is a beachy decorating style made famous on the U.S. East Coast, but can also be found on the West Coast. This style is meant to emit a feeling of summer breeziness throughout the house with the use of natural light, soft tones and a clean aesthetic. The décor incorporates elements of wood and accessories inspired by life at the sea. It is usual to find blue and white striped patterns throughout the house as well as large windows, light-colored plush sofas and painted white wood.",
    imageUrl: "/image/object-style/Coastal-hamptons.jpg",
  },
  {
    id: "contemporary",
    title: "Contemporary",
    description:
      "Often used synonymously for modern. Contemporary is closer to the here and now.",
    imageUrl: "/image/object-style/Contemporary.jpg",
  },
  {
    id: "french-country",
    title: "French country",
    description:
      "It's all about warm, earthy colors, wooden furnishings, extravagant lighting and most importantly, a rustic touch. French Country style is heavily inspired by the french region Provence.",
    imageUrl: "/image/object-style/French-country.jpg",
  },
  {
    id: "hollywood-glam",
    title: "Hollywood glam",
    description:
      "A luxurious, over-the-top and opulent design style with particularly bold color palettes - purples, reds and turquoise. For a homeowner who wants to make a larger-than-life statement.",
    imageUrl: "/image/object-style/Hollywood-glam.jpg",
  },
  {
    id: "industrial",
    title: "Industrial",
    description:
      "Inspired by a warehouse or urban loft. Distinctive attribute is an unfinished rawness in many of the elements, which is most evident in the exposed brick, ductwork and wood. Inside an industrial style home, you can encounter high ceilings, old timber, dangling metal light fixtures and sparse functional furniture. There may be one or two pieces of abstract art or photography that add a dash of color at an otherwise neutral color scheme derived from the primary materials of wood and metals.",
    imageUrl: "/image/object-style/Industrial.jpg",
  },
  {
    id: "mid-century-modern",
    title: "Mid-century modern",
    description:
      "The style gained popularity due to its clean lines, gentle curves and fussy-free architecture. Main theme is functionality. Furniture also plays an important role - they have natural or organic shapes, easy-to-use contemporary designs and simple construction.",
    imageUrl: "/image/object-style/Mid-century-modern.jpg",
  },
  {
    id: "minimalistic",
    title: "Minimalistic",
    description:
      "Takes the ideas of modern design and simplifies them further. Color palettes are neutral and airy. The furnishings are simple and streamlined, and accessories as well as décor are not excessive or flamboyant. Minimalism is ultimately defined by a sense of functionality and ultra-clean lines.",
    imageUrl: "/image/object-style/Minimalistic.jpg",
  },
  {
    id: "modern",
    title: "Modern",
    description:
      "Crisp lines, simple colour palette and use of metal, glass and steel. Modern design radiates a sense of simplicity in every element, including furniture.",
    imageUrl: "/image/object-style/Modern.jpg",
  },
  {
    id: "rustic",
    title: "Rustic",
    description:
      "A return to the basics of nature, with an emphasis on rugged, natural beauty – simple, earthy colors, organic warmth and unpretentious design, vaulted ceilings adorned with wood beams or reclaimed wood floors.",
    imageUrl: "/image/object-style/Rustic.jpg",
  },
  {
    id: "scandinavian",
    title: "Scandinavian",
    description:
      "Reflects the simplicity of life in Nordic countries. Characteristics include space, all-white color palettes, natural elements - like form-pressed wood - bright plastics, enameled aluminum, steel, wide plank flooring, natural lighting, few accessories and functional furniture. Color often comes only from art objects, natural fiber throws or furs, or single pieces of furniture.",
    imageUrl: "/image/object-style/Scandinavian.jpg",
  },
  {
    id: "shabby-chic",
    title: "Shabby chic",
    description:
      "A vintage-inspired style, that has a bit more feminine vibes than most home designs - the furnishings are often worn-down, the color palette includes white, cream and pastels, the light fixtures and wall hangings are often ornate.",
    imageUrl: "/image/object-style/Shabby-chic.jpg",
  },
  {
    id: "traditional",
    title: "Traditional",
    description:
      "A combination of comfortable furniture and casual scenery. An evolution of 18th and 19th century European décor. Traditional homes often feature dark, finished wood, rich color palettes, a variety of textures & patterns, curved lines as well as plenty of fabrics, like velvet, silk and brocade.",
    imageUrl: "/image/object-style/Traditional.jpg",
  },
  {
    id: "transitional",
    title: "Transitional",
    description:
      "A much-loved style using elements from both the traditional and modern style, yielding an appealing and unexpected harmony. The transitional style combines materials, such as steel and glass, with plush furnishings, use a neutral color palette, creating a calm & peaceful space that feels both fashionable & sleek, as well as warm & inviting.",
    imageUrl: "/image/object-style/Transitional.jpg",
  },
];
