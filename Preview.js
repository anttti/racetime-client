import React from "react-native";
import moment from "moment";

const {
    Text,
    View,
    StyleSheet
} = React;

const Preview = React.createClass({
    render() {
        let timeStr = "";
        if (this.props.time !== "") {
            const time = moment(this.props.time, "mm:ss:SS");
            if (!time.isValid()) {
                timeStr = "Invalid Time!";
            } else {
                timeStr = time.format("mm:ss.SS");
            }
        }

        let previewStr = "";
        if (timeStr.length > 0 && this.props.name.length > 0) {
            previewStr = `${timeStr}: ${this.props.name}`;
        }

        return (
            <View style={styles.container}>
                <Text>{previewStr}</Text>
            </View>
        );
    }
});

const styles = StyleSheet.create({
    container: {

    }
});

export default Preview;
