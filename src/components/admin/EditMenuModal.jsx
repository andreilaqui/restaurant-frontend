import { useState } from "react";

function EditMenuModal({ item, categories, onClose, onSave }) {
	if (!item) return null;

	const [preview, setPreview] = useState(item.image?.url || null);

	return (
		<div className="fixed inset-0 bg-black/50 dark:text-white/80 flex items-center justify-center z-50">
			<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md max-h-[90vh] flex flex-col">

				<div className="flex justify-between items-center mb-4 ">
					<h3 className="text-lg font-bold mb-4">
						{item._id ? "Edit Menu Item" : "Add Menu Item"}
					</h3>
					<button
						type="button"
						onClick={onClose}
						className="text-2xl mb-4 font-bold text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
						aria-label="Close"
					>
						×
					</button>
				</div>

				<div className="overflow-y-auto flex-1 pr-2">

					<form className="space-y-4" onSubmit={onSave}>

						{/* Image Preview */}
						{preview && (
							<div className="flex justify-center">
								<img
									src={preview}
									alt="Preview"
									className="object-cover rounded border mb-2"
									style={{ width: "30%", minWidth: "200px", maxHeight: "150px" }}
								/>
							</div>
						)}


						{/* Image */}
						<div>
							<label className="block text-sm font-medium">Image {item._id ? "(optional)" : "(required)"}</label>
							<input
								type="file"
								name="image"
								accept="image/*"
								className="w-full px-3 py-2 border rounded dark:bg-white/10 dark:text-white"
								required={!item._id}   // required if adding, optional if editing
							/>
						</div>

						{/* Name */}
						<div>
							<label className="block text-sm font-medium">Name</label>
							<input
								type="text"
								name="name"
								defaultValue={item.name}
								required
								className="w-full px-3 py-2 border rounded dark:bg-white/10 dark:text-white"
							/>
						</div>

						{/* Price */}
						<div>
							<label className="block text-sm font-medium">Price</label>
							<input
								type="number"
								name="price"
								step="0.01"
								min="0"
								defaultValue={item.price}
								required
								className="w-full px-3 py-2 border rounded dark:bg-white/10 dark:text-white"
							/>
						</div>

						{/* Description */}
						<div>
							<label className="block text-sm font-medium">Description</label>
							<textarea
								name="description"
								defaultValue={item.description}
								rows={3}
								className="w-full px-3 py-2 border rounded dark:bg-white/10 dark:text-white"
							/>
						</div>

						{/* Category */}
						<div>
							<label className="block text-sm font-medium">Category</label>
							<select
								name="category"
								defaultValue={item._id ? item.category?._id : ""}
								required
								className="w-full px-3 py-2 border rounded dark:bg-white/10 dark:text-white"
							>
								<option value="" disabled> -- Select a category -- </option>

								{categories.map((c) => (
									<option key={c._id} value={c._id}>
										{c.label}
									</option>
								))}
							</select>
						</div>



						{/* Availability */}
						<div>
							<label className="inline-flex items-center mr-2">Available</label>
							<input
								type="checkbox"
								name="availability"
								defaultChecked={item.availability}
							/>
						</div>

						{/* Tags */}
						<div>
							<label className="block text-sm font-medium">Tags</label>
							<select
								name="tags"
								multiple
								defaultValue={item.tags}
								className="w-full px-3 py-2 border rounded dark:bg-white/10 dark:text-white"
							>
								<option value="vegetarian">Vegetarian</option>
								<option value="vegan">Vegan</option>
								<option value="spicy">Spicy</option>
								<option value="bestseller">Bestseller</option>
								<option value="new">New</option>
							</select>
							<p className="text-xs text-gray-500">
								Hold Ctrl (Windows) or Cmd (Mac) to select multiple
							</p>
						</div>

						{/* Buttons */}
						<div className="flex justify-end space-x-2">
							<button
								type="button"
								onClick={onClose}
								className="px-3 py-1 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
							>
								Cancel
							</button>
							<button
								type="submit"
								className="px-3 py-1 bg-sunrice-brown text-white rounded hover:bg-sunrice-yellow hover:text-sunrice-brown transition"
							>
								Save
							</button>
						</div>
					</form>

				</div>
			</div>
		</div>
	);
}

export default EditMenuModal;