import { supabase } from "./sick-bay/supabase";

export async function getTrainingDays(): Promise<string[]> {
	const { data, error } = await supabase
		.from("training_days")
		.select("trained_on")
		.order("trained_on", { ascending: true }); 
	if (error) {
		throw new Error(
			'Could not load training days: ${error.message}'
		);
	}

	return data.map((row) => row.trained_on);
}
