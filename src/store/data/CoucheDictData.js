import coucheIcon from "@/styles/images/icons/couches/couche.jpg";

const coucheDictData = [
  {
    id: 1,
    icon: coucheIcon,
    title: "Audrey Almond",
  },
  {
    id: 2,
    icon: coucheIcon,
    title: "Bay Bridge",
  },
  {
    id: 3,
    icon: coucheIcon,
    title: "Sun Set Garden",
  },

  {
    id: 4,
    icon: coucheIcon,
    title: "Golden bridge",
  },

  {
    id: 5,
    icon: coucheIcon,
    title: "Moon dreams",
  },

  {
    id: 6,
    icon: coucheIcon,
    title: "Super power",
  },

  {
    id: 7,
    icon: coucheIcon,
    title: "Blue burches",
  },

  {
    id: 8,
    icon: coucheIcon,
    title: "Forest side",
  },

  {
    id: 9,
    icon: coucheIcon,
    title: "Ocean wind",
  },

  {
    id: 10,
    icon: coucheIcon,
    title: "Fox fense",
  },

  {
    id: 11,
    icon: coucheIcon,
    title: "Black cat",
  },

  {
    id: 12,
    icon: coucheIcon,
    title: "Kind dog",
  },
]

export function getCoucheDictData() {
  return coucheDictData;
}

export function findCoucheDictItem(id) {
  const foundList = coucheDictData.filter((item) => item['id'] === id);

  if (foundList.length > 1) {
    console.warn("CoucheDictData [findCoucheDictItem] found more than 1 item [ id = " + id + " ]");
  }
  if (foundList.length > 0) {
    return foundList[0];
  }

  return null;
}