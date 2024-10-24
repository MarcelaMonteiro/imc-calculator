import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	Pressable,
	Image,
	Keyboard,
	ScrollView,
	KeyboardAvoidingView,
	Dimensions,
	Platform,
} from "react-native";
import Resultimc from "./Resultimc";
import ChloeIcon from "../../../assets/image/IconeChloe.png";
import AcimaPeso from "../../../assets/image/AcimaDoPeso.png";
import AbaixoPeso from "../../../assets/image/AbaixoDoPeso.png";
import PesoIdeal from "../../../assets/image/PesoIdeal.png";

export default function Form() {
	const [height, setHeight] = useState(null);
	const [weight, setWeight] = useState(null);
	const [messageImc, setMessageImc] = useState("Preencha o peso e a altura");
	const [imc, setImc] = useState(null);
	const [textPressable, setTextPressable] = useState("Calcular");
	const [image, setImage] = useState(0);

	const imgs = [ChloeIcon, AcimaPeso, AbaixoPeso, PesoIdeal];
	const windowWidth = Dimensions.get("window").width;
	const isWeb = Platform.OS === "web";
	const imageSize =
		isWeb && windowWidth > 1024
			? { width: 300, height: 300 }
			: { width: 200, height: 200 };

	function imcCalculator() {
		const formattedHeight = height.replace(",", ".");
		const formattedWeight = weight.replace(",", ".");
		const heightInMeters =
			formattedHeight > 10 ? formattedHeight / 100 : formattedHeight;

		if (
			!isNaN(heightInMeters) &&
			!isNaN(formattedWeight) &&
			heightInMeters > 0
		) {
			const calculatedImc = (
				formattedWeight /
				(heightInMeters * heightInMeters)
			).toFixed(2);
			setImc(calculatedImc);

			const idealWeightMin = (18.5 * heightInMeters * heightInMeters).toFixed(
				2
			);
			const idealWeightMax = (24.9 * heightInMeters * heightInMeters).toFixed(
				2
			);

			setMessageImc(
				`Seu IMC é igual: ${calculatedImc}. O peso ideal seria entre ${idealWeightMin}kg e ${idealWeightMax}kg.`
			);

			if (calculatedImc < 18.5) {
				setImage(2);
			} else if (calculatedImc >= 18.5 && calculatedImc < 25) {
				setImage(3);
			} else if (calculatedImc >= 25) {
				setImage(1);
			}
		} else {
			setImc(null);
			setImage(0);
		}
	}

	function validationImc() {
		if (height != null && weight != null && height !== "" && weight !== "") {
			setImage(null);
			imcCalculator();
			setHeight(null);
			setWeight(null);
			setMessageImc("Seu imc é igual:");
			setTextPressable("Calcular novamente");
		} else {
			setImage(0);
			setImc(null);
			setTextPressable("Calcular");
			setMessageImc("Preencha o peso e a altura");
		}
	}

	return (
		<View className="relative flex justify-center items-center top-14">
			<View className=" bg-[#D29BFD] rounded-[40px] w-[360px]  p-10 flex justify-center items-center ">
				<ScrollView keyboardShouldPersistTaps="handled" scrollEnabled={false}>
					<View>
						<Text className="text-[40px] p-2 ">Altura</Text>
						<TextInput
							className="text-[25px]  border-gray-300 bg-white mt-2 px-2 rounded-[10px] p-2 w-[280px] "
							placeholder="Ex: 1,75"
							placeholderTextColor="#D3D3D3"
							keyboardType="numeric"
							onChangeText={setHeight}
							value={height || ""}
						/>
						<Text className="text-[40px] mt-5 p-2">Peso</Text>

						<TextInput
							className="text-[25px]  border-gray-300 bg-white mt-2 px-2 rounded-[10px] p-2 w-[280px] "
							placeholder="Ex: 80"
							placeholderTextColor="#D3D3D3"
							keyboardType="numeric"
							onChangeText={setWeight}
							value={weight || ""}
						/>

						<Pressable
							className="bg-blue-500 p-3 rounded-[10px] mt-5 mb-10 md:mb-16"
							onPress={() => {
								Keyboard.dismiss();
								validationImc();
							}}
						>
							<Text className="text-white text-[25px] text-center">
								{textPressable}
							</Text>
						</Pressable>
					</View>
				</ScrollView>
				<View className="absolute left-[50%] bottom-[90%] md:left-[40%] md:bottom-[78%] justify-center items-center ">
					<Image
						style={imageSize}
						className="w-[200px] h-[200px] md:h-[10px] md:w-[10px]"
						source={imgs[image]}
					/>
				</View>
				<View className="absolute md:bottom-10 bottom-0 left-0 right-0 ">
					<Resultimc messageResultImc={messageImc} ResultImc={imc} />
				</View>
			</View>
		</View>
	);
}