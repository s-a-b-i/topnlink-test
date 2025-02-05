import express from "express";
import {
    createFavourite,
    getFavourites,
  getFavouriteById,
  updateFavourite,
  deleteFavourite,
} from "../../controllers/advertiser/favourite.controller.js";

const router = express.Router();

// Favourite Routes
router.post("/favourites/get-all", getFavourites);
router.post("/favourites", createFavourite);
router.get("/favourites/:favouriteId", getFavouriteById);
router.put("/favourites/:favouriteId", updateFavourite);
router.delete("/favourites/:favouriteId", deleteFavourite);


export default router;