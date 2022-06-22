
class CategoryService {

  constructor(animalCategoriesRepo, animalPhotoRepo) {
    this.animalCategoriesRepo = animalCategoriesRepo;
    this.animalPhotoRepo = animalPhotoRepo;
  }

  async getCategories() {
    const categories = await this.animalCategoriesRepo.findAll();
    return categories;
  }

  async addCategory(categoryName) {
    const added = await this.animalCategoriesRepo.create({
      category: categoryName
    });

    return added;
  }

  async editCategory(categoryId, categoryName) {
    const updated = await this.animalCategoriesRepo.update(
      {
        category: categoryName
      },
      {
        where: {
          id: categoryId
        },
        returning: true
      });

    return updated[1][0];
  }

  async deleteCategory(categoryId) {
    await this.animalCategoriesRepo.destroy({
      where: {
        id: categoryId
      }
    });
  }
}

module.exports = (sequelize) => new CategoryService(sequelize);
