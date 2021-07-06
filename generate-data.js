const faker = require("faker");
const fs = require("fs");

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
        thumbnail: faker.image.imageUrl(),
      };

      productList.push(product);
    });
  }

  return productList;
};

(() => {
  const categoryList = randomCategoryList(4);
  const productList = randomProductList(categoryList, 5);
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
