const faker = require("faker");
const fs = require("fs");

const sizeList = ["XS", "S", "M", "L", "XL"];

const randomSize = () => {
  const result = Math.floor(Math.random() * 5);

  return sizeList[result];
};

const randomCategoryList = (n) => {
  if (n <= 0) return [];
  const categoryList = [];

  Array.from(new Array(n)).forEach(() => {
    const category = {
      id: faker.datatype.uuid(),
      name: faker.commerce.department(),
      createAt: Date.now(),
      updatedAt: Date.now(),
    };

    categoryList.push(category);
  });

  return categoryList;
};

const randomProductList = (categoryList, numberOfProducts) => {
  if (numberOfProducts <= 0) return [];
  const productList = [];

  for (const category of categoryList) {
    Array.from(new Array(numberOfProducts)).forEach(() => {
      const product = {
        categoryId: category.id,
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        desc: faker.commerce.productDescription(),
        price: Number.parseFloat(faker.commerce.price()),
        createdAt: Date.now(),
        updatedAt: Date.now(),
        thumbnail: faker.image.nature(163, 163),
        color: faker.commerce.color(),
        brand: faker.commerce.productMaterial,
        size: randomSize(),
      };

      productList.push(product);
    });
  }

  return productList;
};

(() => {
  const categoryList = randomCategoryList(18);
  const productList = randomProductList(categoryList, 10);
  const db = {
    categories: categoryList,
    products: productList,
    profile: {
      name: "Thanh",
    },
  };

  fs.writeFile("db.json", JSON.stringify(db), () => {
    console.log("Generate data successfully!");
  });
})();
