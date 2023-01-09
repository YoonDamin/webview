import React, { useRef, useState, useCallback, useEffect } from "react";
import { BackHandler, Platform, StyleSheet, SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";

export default function App() {
	const webView = useRef();

	const [canGoBack, setCanGoBack] = useState(false);

	const handleBack = useCallback(() => {
		if (canGoBack && webView.current) {
			webView.current.goBack();
			return true;
		}
		return false;
	}, [canGoBack]);

	useEffect(() => {
		BackHandler.addEventListener("hardwareBackPress", handleBack);
		return () => {
			BackHandler.removeEventListener("hardwareBackPress", handleBack);
		};
	}, [handleBack]);

	// 접속하는 기기가 ios또는 안드로이드로 확인하고 그에 맞게 설정한 스타일을 지정한다.
	const platformStyles = StyleSheet.create({
		// webView:
		// 	Platform.OS === "ios"
		// 		? { marginTop: 30, marginBottom: 40 }
		// 		: { marginTop: 30 },
	});

	return (
		<SafeAreaView style={styles.safeAreaView}>
			<WebView
				ref={webView}
				source={{ uri: "http://m.dealpang.com" }}
				// 지정된 스타일을 적용
				style={platformStyles.webView}
				onLoadProgress={(event) => setCanGoBack(event.nativeEvent.canGoBack)}
			/>
		</SafeAreaView>
	);
}
const styles = StyleSheet.create({
	safeAreaView: {
		flex: 1,
		backgroundColor: "#fff",
	},
});
