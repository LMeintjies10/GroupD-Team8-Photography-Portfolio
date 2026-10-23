// All gallery items live here. The Portfolio renders from this array,
// so adding a photo means adding one object, not copy-pasting JSX.
//
// size: how big the card is in the full "All" mosaic
//   feature | side | third | thirdWide | banner  (see SIZE_CLASSES in GalleryItem.jsx)

export const photos = [
  {
    id: 1,
    src: "/images/Image1.jpg",
    alt: "Architectural photography looking up between buildings",
    title: "Quiet confidence",
    category: "Architecture",
    size: "feature",
  },
  {
    id: 2,
    src: "/images/Image2.jpg",
    alt: "A swimmer beside a rocky coastline",
    title: "Somewhere still",
    category: "Travel",
    size: "side",
  },
  {
    id: 3,
    src: "/images/Image3.jpg",
    alt: "A person standing in golden sunlight beside the water",
    title: "In bloom",
    category: "Details",
    size: "side",
  },
  {
    id: 4,
    src: "/images/Image4.jpg",
    alt: "A peaceful coastal scene at sunset",
    title: "Unscripted",
    category: "Portraits",
    size: "third",
  },
  {
    id: 5,
    src: "/images/Image5.jpg",
    alt: "A sunlit woodland path surrounded by trees",
    title: "Considered details",
    category: "Nature",
    size: "third",
  },
  {
    id: 6,
    src: "/images/Image6.jpg",
    alt: "A rocky landscape surrounded by soft evening light",
    title: "Out of office",
    category: "Travel",
    size: "thirdWide",
  },
  {
    id: 7,
    src: "/images/Image7.jpg",
    alt: "Golden reflections on the water",
    title: "All together now",
    category: "Events",
    size: "banner",
  },
];

// Filter buttons are derived from the data, so they can never drift out of sync.
export const categories = ["All", ...new Set(photos.map((p) => p.category))];