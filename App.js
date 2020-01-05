import React from 'react';
import { 
  StyleSheet
  , Text
  , View
  , StatusBar
  , TextInput
  , Dimensions
  , Platform
  , ScrollView
  , AsyncStorage
} from 'react-native';
  import Todo from './Todo.js';
  import { AppLoading } from 'expo';
  import uuidv1 from 'uuid/v1';

const { width, height } = Dimensions.get('window');

class App extends React.Component {
  state = {
    input: ''
    , loaded: false
    , todos: {}
  };

  componentDidMount() {
    this._loadTodo();
  }

  render() {
    const { input, loaded, todos } = this.state;

    if (!loaded) {
      return (
        <AppLoading/>
      )
    } else {
        return (
          <View style={styles.container}>
            <StatusBar barStyle='light-content' />
            <Text style={styles.title}> TODO list </Text>
            <View style={styles.card}>
              <TextInput 
                style={styles.input} 
                placeholder='new to do'
                value={input}
                onChangeText={this._getNewInput}
                onSubmitEditing={this._addTodo}
              />
              <ScrollView contentContainerStyle={styles.scroll}>
                {Object.values(todos).reverse().map(
                  t => <Todo 
                    key={t.id}
                    id={t.id}
                    todo={t.todo}
                    complete={t.isCompleted}
                    createdAt={t.createdAt}
                    _delete={this._deleteTodo}
                    _uncompleted={this._uncompletedTodo}
                    _completed={this._completedTodo}
                    _update={this._updateTodo}
                  />
                )}
              </ScrollView>
            </View>
        </View>
    )}
  }

  // _getNewInput(text)로 사용할 경우 onChageText event에 따로 bind 해줘야함
  _getNewInput = text => {
    this.setState({ input: text });
  }
  _loadTodo = async () => {
    const todo = await AsyncStorage.getItem('todo');
    this.setState({ loaded: true })
    // todos: JSON.parse(todo)
  }
  _addTodo = () => {
    const { input, todos } = this.state;
    if (input !== '') {
      this.setState(prevState => {
        const ID = uuidv1();
        const newTodo = {
          [ID] : {
          id: ID
          , isCompleted: false
          , todo: input
          , createdAt: Date.now()
        }
      };
      const newState = {
        ...prevState,
        todos: {
          ...prevState.todos
          , ...newTodo
        }
        , input: ''
      };
      this._saveTodo(newState.todos);
      return { ...newState };
      })
    }
  }
  _deleteTodo = (id) => {
    this.setState(prevState => {
        const todos = prevState.todos;
        delete todos[id];
        const newState = {
            ...prevState
            , ...todos
        };
        this._saveTodo(newState.todos);
        return {...newState};
    })
  }
  _uncompletedTodo = (id) => {
    this.setState(prevState => {
      const newState = {
        ...prevState
        , todos : {
          ...prevState.todos
          , [id] : {
            ...prevState.todos[id]
            , isCompleted: false
          }
        }
      };
      this._saveTodo(newState.todos);
      return {... newState};
    });
  }
  _completedTodo = (id) => {
    this.setState(prevState => {
      const newState = {
        ...prevState
        , todos : {
          ...prevState.todos
          , [id] : {
            ...prevState.todos[id]
            , isCompleted: true
          }
        }
      };
      this._saveTodo(newState.todos);
      return {... newState};
    });
  }
  _updateTodo = (id, text) => {
    this.setState(prevState => {
      const newState = {
        ...prevState
        , todos : {
          ...prevState.todos
          , [id] : {
            ...prevState.todos[id]
            , todo: text
          }
        }
      };
      this._saveTodo(newState.todos);
      return {...newState};
    });
  }
  _saveTodo = newTodo => {
    // AsyncStorage는 string 저장용 (not object)
    // const saveTodo = AsyncStorage.setItem('todo', newTodo);
    const saveTodo = AsyncStorage.setItem('todo', JSON.stringify(newTodo));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F23657',
    alignItems: 'center',
  }
  , title: {
    color: 'white'
    , fontSize: 40
    , marginTop: 40
    , fontWeight: "300"
  }
  , card: {
    flex: 1
    , backgroundColor: 'white'
    , width: width - 50
    , marginTop: 20
    , borderTopLeftRadius: 15
    , borderTopRightRadius: 15
    // SHADOW : platform customizing code
    , ...Platform.select({
      ios: {
        shadowColor: 'rgb(50, 50, 50)'
        , shadowOpacity: 0.5
        , shadowRadius: 0.5
        , shadowOffset: {
          height: -2
          , width: 2
        }
      }
      , android: {
        elevation: 3
      }
    })
  }
  , input: {
    fontSize: 20
    , padding: 20
    , borderBottomColor: 'lightgrey'
    , borderBottomWidth: 1
  }
  , scroll: {
    alignItems: 'center'
  }
});

export default App;