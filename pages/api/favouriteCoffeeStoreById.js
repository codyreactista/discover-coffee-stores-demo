import { findRecordByFilter, getMinifiedRecord, table } from "@/lib/airtable";

const favouriteCoffeeStoreById = async (req, res) => {
  if (req.method === "PATCH") {
    try {
      const { id } = req.body;

      if (id) {
        const records = await findRecordByFilter(id);

        if (records.length > 0) {
          const record = records[0];

          const calculateVoting = ++record.voting;

          const updateRecord = await table.update(record.recordId, {
            voting: calculateVoting,
          });

          if (updateRecord) {
            const minifiedRecord = getMinifiedRecord(updateRecord);
            res.json(minifiedRecord);
          }
        } else {
          res.json({ message: "Coffee store id doesn't exist", id });
        }
      } else {
        res.status(400);
        res.json({ message: "Id is missing" });
      }
    } catch (error) {
      res.status(500);
      res.json({ message: "Error upvoting coffee store", error });
    }
  }
};

export default favouriteCoffeeStoreById;
