//Builder is implemented in 'zod'
import { z } from "zod";

const carSchema = z.object({
  make: z.string(),
  model: z.string(),
  year: z.number().int().min(1886),
  isElectric: z.boolean(),
});

const car = {
  make: "Tesla",
  model: "Model S",
  year: 2021,
  isElectric: true,
};

const validCar = await carSchema.parseAsync(car);
