import NodeCache from "node-cache";

export const cache = new NodeCache({ stdTTL: 15 });

export const verifyCache = (req, res, next) => {
  try {
    const { reqId } = req.body;
    if (cache.has(reqId)) {
      console.log("[CACHED_DATA]=> " + cache.get(reqId));

      return res.status(200).json(cache.get(reqId));
    }
    return next();
  } catch (err) {
    throw new Error(err);
  }
};
