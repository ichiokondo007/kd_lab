"use client";

import React, { useState } from "react";

interface PasswordInputProps {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ value, onChange }) => {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	return (
		<div className="relative">
			<input
				type={isPasswordVisible ? "text" : "password"}
				value={value}
				onChange={onChange}
				className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
				placeholder="Enter your password"
			/>
			<button
				type="button"
				onClick={() => setIsPasswordVisible(!isPasswordVisible)}
				className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
			>
				{isPasswordVisible ? "Hide" : "Show"}
			</button>
		</div>
	);
};

export default PasswordInput;

