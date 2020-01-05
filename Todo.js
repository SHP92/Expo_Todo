import React from 'react';
import { 
    Text
    , StyleSheet
    , View
    , TouchableOpacity
    , Dimensions
    , TextInput
} from 'react-native';

const { width, height } = Dimensions.get('window');

class Todo extends React.Component {
    state = {
        isEditing: false
        , complete: this.props.complete
        , todoValue: this.props.todo
    };

    render() {
        const { isEditing, todoValue } = this.state;
        const { id, _delete, complete } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.column}>
                    <TouchableOpacity onPress={this._toggleComplete}>
                        <View style={[
                            styles.checkBtn
                            , complete ? styles.checkBtn_completed : styles.checkBtn_uncompleted
                        ]}></View>
                    </TouchableOpacity>
                    <View>
                    {
                        isEditing ? (
                            <View>
                                <TextInput 
                                    style={[styles.input, styles.text]}
                                    value ={ todoValue }
                                    onChangeText={this._controlInput}
                                    onBlur={this._endEdit}
                                />
                            </View>
                        ) : (
                            <Text style={[
                                styles.text
                                , complete ? styles.text_completed : null
                            ]}> { todoValue } </Text>
                        ) 
                    }
                    </View>
                </View>
                <View style={styles.column}>
                    {
                        complete ? null : (
                        isEditing ? (
                            <View style={styles.action_view}>
                                <TouchableOpacity 
                                    style={styles.action_container} 
                                    onPress={this._endEdit}
                                >
                                    <Text style={styles.action}>✔️</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View style={styles.action_view}>
                                <TouchableOpacity 
                                    style={styles.action_container} 
                                    onPress={this._startEdit}
                                >
                                    <Text style={styles.action}>🖊</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={styles.action_container}
                                    onPressOut={() => _delete(id)}
                                >
                                    <Text style={styles.action}>✖️</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    )
                    }
                </View>
            </View>
        )
    }

    _toggleComplete = () => {
        const { isEditing } = this.state;
        const { id, complete, _uncompleted, _completed } = this.props;

        if (!isEditing) {
            if (complete) {
                _uncompleted(id);
            } else {
                _completed(id);
            }
        } else {
            _uncompleted(id);
        }
    }
    _startEdit = () => {
        const { id, todo, _update } = this.props;
        _update(id, todo);
        this.setState({ isEditing: true });
    }
    _endEdit = () => {
        const { id, todo, _update } = this.props;
        _update(id, todo);
        this.setState({ isEditing: false });
    }
    _controlInput = text => {
        this.setState({ todoValue: text });
    }
}

const styles = StyleSheet.create({
    container: {
        width: width - 70
        , borderBottomColor: 'lightgrey'
        , borderBottomWidth: 1
        , padding: 10
        , flexDirection: 'row'
        , justifyContent: 'space-between'
    }
    , column: {
        flexDirection: 'row'
    }
    , checkBtn: {
        width: 20
        , height: 20
        , borderRadius: 10
        , marginLeft: -5
        , marginRight: 5
    }
    , checkBtn_completed: {
        backgroundColor: 'lightgrey'
    }
    , checkBtn_uncompleted: {
        borderColor: 'lightgrey'
        , borderWidth: 1
    }
    , text: {
        fontSize: 20
        , fontWeight: "300"
    }
    , text_completed: {
        color: 'lightgrey'
        , textDecorationLine: 'line-through'
    }
    , action_view: {
        flexDirection: 'row'
    }
    , action_container: {
        
    }
    , action: {
        fontSize: 20
        , marginHorizontal: 5
    }
    , input: {
        color: 'lightgrey'
        , width : width / 2
    }
})

export default Todo;