import * as actionTypes from "./shopping-types";
import smartphone from './headphone.jpg';
import speaker from './iphone-12.jpg';
import book from './ps5.jpg'
import shoe from './air-jordan-1.jpg';
import ipad from './iPad.jpg';
import jbl from './JBL_Go2.jpg'



const INITIAL_STATE = {
  products: [
    {
      id: 1,
      title: "Rockerz 550",
      description:
        `boAt Rockerz 550 is an over-ear wireless headset that has been ergonomically designed to meet the needs of music lovers. The headphones come equipped with the latest Bluetooth v5.0 for instant wireless connectivity. Its powerful 500mAh battery provides playtime of up to 20 hours for an extended audio bliss. Its 50mm dynamic drivers help supply immersive musical experience to the user with immersive sound. `,
      price: 2000,
      image:smartphone,
    },
    {
      id: 2,
      title: "Iphone 12",
      description:
          `A14 Bionic, the fastest chip in a smartphone.
          An edge-to-edge OLED display. Ceramic Shield with four times better drop performance. And Night mode on every camera. iPhone 12 has it all — in two perfect sizes.The iPhone 12 features a 6.1-inch (15 cm) display with Super Retina XDR OLED technology at a resolution of 2532×1170 pixels and a pixel density of about 460 ppi.`,
      price: 82900.0,
      image:speaker,
    },
    {
      id: 3,
      title: "PS5",
      description:
        `The PlayStation 5 (PS5) is a home video game console developed by Sony Interactive Entertainment.The PlayStation 5's main hardware features include a solid-state drive customized for high-speed data streaming to enable significant improvements in storage performance, an AMD GPU capable of 4K resolution display at up to 120 frames per second, hardware-accelerated ray tracing for realistic lighting and reflections.`,
      price: 30000.0,
      image:book
    },
    {
      id: 4,
      title: "Air Jordan - 1",
      description:
        `Familiar colours, applied with a classic colour-blocking scheme, characterise this Air Jordan 1. The shoe brings genuine University Blue leather to the ankle, heel, toe and outsole, with black on the Swoosh and collar and contrasting white on the quarter panel, midsole, tongue and toe box. A black Wings logo with University Blue branding on the tongue helps finish off the model's clean and classic detailing.`,
      price: 13995.0,
      image:shoe
    },
    {
      id: 5,
      title: "IPAD-PRO",
      description:
        `The tablet comes with a 11.00-inch touchscreen display with a resolution of 2388x1668 pixels at a pixel density of 264 pixels per inch (ppi). Apple iPad Pro 11-inch (2021) Wi-Fi is powered by an octa-core Apple M1 processor. It comes with 8GB of RAM.As far as the cameras are concerned, the Apple iPad Pro 11-inch (2021) Wi-Fi on the rear packs 12-megapixel camera. It sports a 12-megapixel camera on the front for selfies.`,
      price: 71900.0,
      image:ipad
    },
    {
      id: 6,
      title: "JBL GO 2",
      description:
        `The JBL GO 2 is a full-featured waterproof Bluetooth speaker to take with you everywhere. Wirelessly stream music via Bluetooth for up to 5 hours of continuous JBL quality sound. Making a splash with its new IPX7 waterproof design, GO 2 gives music lovers the opportunity to bring their speaker poolside, or to the beach. GO 2 also offers crystal clear phone call experience with its built-in noise-cancelling speakerphone.`,
      price: 2000.0,
      image:jbl
    }
  ],
  cart: [],
  currentItem: null,
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      // Great Item data from products array
      const item = state.products.find(
        (product) => product.id === action.payload.id
      );
      // Check if Item is in cart already
      const inCart = state.cart.find((item) =>
        item.id === action.payload.id ? true : false
      );

      return {
        ...state,
        cart: inCart
          ? state.cart.map((item) =>
              item.id === action.payload.id
                ? { ...item, qty: item.qty + 1 }
                : item
            )
          : [...state.cart, { ...item, qty: 1 }],
      };
    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };
    case actionTypes.ADJUST_ITEM_QTY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, qty: +action.payload.qty }
            : item
        ),
      };
    case actionTypes.LOAD_CURRENT_ITEM:
      return {
        ...state,
        currentItem: action.payload,
      };
    default:
      return state;
  }
};

export default shopReducer;
