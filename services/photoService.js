const { Op } = require('sequelize');

class PhotoService {

  constructor(animalPhotoRepo) {
    this.animalPhotoRepo = animalPhotoRepo;
  }

  async getPhotos() {
    const photos = await this.animalPhotoRepo.findAll();
    return photos;
  }

  async getPhotosForCategories(categoryIds) {
    const photos = await this.animalPhotoRepo.findAll({
      where: {
        category_id: {
          [Op.or]: categoryIds
        }
      }
    });

    return photos;
  }

  async addPhoto(categoryId, photoUrl) {
    //TODO: Check if category id is valid

    const added = await this.animalPhotoRepo.create({
      category_id: categoryId,
      photo_url: photoUrl
    });

    return added;
  }

  async editPhoto(photoId, categoryId, photoUrl) {
    const updated = await this.animalPhotoRepo.update(
      {
        category_id: categoryId,
        photo_url: photoUrl
      },
      {
        where: {
          id: photoId
        },
        returning: true
      });

    return updated[1][0];
  }

  async deletePhoto(photoId) {
    const added = await this.animalPhotoRepo.destroy({
      where: {
        id: photoId
      }
    });

    return added;
  }
}

module.exports = (sequelize) => new PhotoService(sequelize);
