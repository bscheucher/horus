export function SelectField({
	label,
	field,
	options,
	value,
	onChange,
}: {
	label: string;
	field: string;
	options: string[];
	value: string;
	onChange: (field: string, value: string) => void;
}) {
	const id = `select-${field}`;

	return (
		<div className="flex flex-col gap-1.5 col-span-full">
			<label
				htmlFor={id}
				className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1"
			>
				{label}
			</label>
			<select
				id={id}
				className="select select-bordered w-full text-slate-800 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 rounded"
				value={value}
				onChange={(e) => onChange(field, e.target.value)}
			>
				{options.map((opt) => (
					<option key={opt} value={opt}>
						{opt}
					</option>
				))}
			</select>
		</div>
	);
}
