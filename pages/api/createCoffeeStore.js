import { findRecordByFilter, getMinifiedRecord, table } from "@/lib/airtable";

const createCoffeeStore = async (req, res) => {
  if (req.method === "POST") {
    // find a record

    const { id, name, address, imgUrl, voting } = req.body;

    try {
      if (id) {
        const records = await findRecordByFilter(id);

        if (records.length > 0) {
          res.json(records);
        } else {
          // create a record
          if (name) {
            const createRecord = await table.create({
              id,
              name,
              address,
              imgUrl,
              voting,
            });
            const record = getMinifiedRecord(createRecord);

            res.json(record);
          } else {
            res.status(400);
            res.json({ message: "Id or name is missing" });
          }
        }
      } else {
        res.status(400);
        res.json({ message: "Id is missing" });
      }
    } catch (err) {
      console.error("Error creating or finding a store", err);
      res.status(500);
      res.json({ message: "Error creating or finding a store", err });
    }
  }
};

export default createCoffeeStore;
