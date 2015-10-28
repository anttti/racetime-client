import React from "react-native";
import moment from "moment";
import Firebase from "firebase";
import Button from "react-native-button";

import Preview from "./Preview";

const {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    TextInput
} = React;

const racetimeclient = React.createClass({
    componentWillMount() {
        this.firebaseRef = new Firebase("https://brilliant-torch-3113.firebaseio.com/entries/");
    },
    addEntry() {
        const time = moment(this.state.time, "mm:ss:SS");

        if (!time.isValid()) {
            console.log("invalid time");
            return;
        }

        this.firebaseRef.push(this.state);
        this.setState(this.getInitialState());
    },
    onChange(field, value) {
        this.setState({ [field]: value });
    },
    isValid() {
        const time = moment(this.state.time, "mm:ss:SS");
        return (time.isValid() && this.state.name.trim().length > 0);
    },
    getInitialState() {
        return {
            time: "",
            name: ""
        };
    },
    render: function() {
        return (
            <View>
                <Text style={styles.header}>
                    RaceTime!
                </Text>
                <Preview time={this.state.time} name={this.state.name} />
                <TextInput style={styles.input} onChangeText={this.onChange.bind(null, "time")} value={this.state.time} />
                <TextInput style={styles.input} onChangeText={this.onChange.bind(null, "name")} value={this.state.name} />
                <Button style={styles.button} disabled={!this.isValid()} onPress={this.addEntry}>
                    Add Entry
                </Button>
            </View>
        );
    }
});

const styles = StyleSheet.create({
    header: {
        fontSize: 20,
        textAlign: "center",
        margin: 30,
    },
    input: {
        height: 36,
        padding: 4,
        margin: 5,
        fontSize: 18,
        borderWidth: 1,
        borderRadius: 4,
    },
    button: {
        marginTop: 5
    }
});

AppRegistry.registerComponent("racetimeclient", () => racetimeclient);
