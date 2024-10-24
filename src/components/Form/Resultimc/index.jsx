import React from "react";
import { View, Text } from "react-native";

export default function Resultimc(props) {
	return (
		<View className="flex justify-center items-center ">
			<Text className="text-[24px]  text-[#FF0000]  ">
				{props.messageResultImc}{" "}
			</Text>
			<Text className="text-[24px] text-[#000000] "> {props.ResultImc} </Text>
		</View>
	);
}
