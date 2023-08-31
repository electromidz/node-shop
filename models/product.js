import { z } from "zod";

//Schema Defination and model.js
var ProductSchema = new mongoose.Schema(
  {
    name: String,
    category: String,
    subcategory: [
      {
        type: String,
        model: [
          {
            type: String,
            colour: [
              {
                name: String,
                image: String,
              },
            ],
            size: [
              {
                val: Number,
                price: Number,
              },
            ],
          },
        ],
      },
    ],
    description: String,
    created_at: { type: Date },
    updated_at: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
  },
  { versionKey: false },
  { strict: false }
);

function productValidation(product) {
  const schema = z.object({
    name: z.string(),
    category: z.string(),
    subcategory: [
      z.object({
        type: z.string(),
        color: [
          z.object({
            name: z.string(),
            image: z.string(),
          }),
        ],
      }),
    ],
  });
}

export default mongoose.model("Product", ProductSchema);
