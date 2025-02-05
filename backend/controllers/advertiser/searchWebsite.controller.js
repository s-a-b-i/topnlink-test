import Website from '../../models/website.model.js';
import { checkUserAndBlockStatus } from '../../utils/userCheck.js';
import { createOrUpdateStats } from '../../utils/stats.js';
import { getCurrentDateTime } from '../../utils/getCurrentDateTime.js';

export async function searchWebsites(req, res) {
  try {
    const userId = req.body.userId;

    try {
      await checkUserAndBlockStatus(userId);
    } catch (error) {
      return res.status(403).json({ message: error.message });
    }

    const {
      searchQuery,
      minPrice,
      maxPrice,
      da,
      ascore,
      mediaType,
      category,
      country,
      gambling,
      cbd,
      adult,
      trading,
      googleNews
    } = req.query;

    const filters = {};

    if (searchQuery) {
      filters.webDomain = { $regex: searchQuery, $options: 'i' };
      filters.mediaType = { $regex: searchQuery, $options: 'i' };
      filters.mediaName = { $regex: searchQuery, $options: 'i' };
    }
    if (minPrice) {
      filters.price = { ...filters.price, $gte: Number(minPrice) };
    }
    if (maxPrice) {
      filters.price = { ...filters.price, $lte: Number(maxPrice) };
    }
    if (da) {
      filters.da = { $gte: Number(da[0]), $lte: Number(da[1]) };
    }
    if (ascore) {
      filters.ascore = { $gte: Number(ascore[0]), $lte: Number(ascore[1]) };
    }
    if (mediaType) {
      filters.mediaType = mediaType;
    }
    if (category) {
      filters.category = { $in: [category] };
    }
    if (country) {
      filters.language = country;
    }
    if (gambling ) {
      filters.sensitiveTopics = { $in: ['Gambling'] };
    }
    if (cbd ) {
      filters.sensitiveTopics = { $in: ['CBD'] };
    }
    if (adult ) {
      filters.sensitiveTopics = { $in: ['Adult'] };
    }
    if (trading ) {
      filters.sensitiveTopics = { $in: ['Trading'] };
    }
    if (googleNews) {
      filters.googleNews = googleNews === 'true';
    }

    // fetch websites with filters and approved true
    const websites = await Website.find({ ...filters, status: 'approved' });

    // Update stats for each website found
    const { year, month, day } = getCurrentDateTime();

    for (const website of websites) {
      await createOrUpdateStats({
        userId,
        websiteId: website._id,
        year,
        month,
        day,
        updates: {
          impressions: 1
        }
      });
    }

    res.status(200).json(websites);
  } catch (error) {
    res.status(500).json({ message: 'Error searching websites', error: error.message });
  }
}