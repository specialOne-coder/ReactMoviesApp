import React from 'react'
import {StyleSheet,View,FlatList, ActivityIndicator} from 'react-native'
import FilmItem from './filmItem'
import {connect} from 'react-redux'



class FilmList extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            films:[]
        }
    }

    _detailsFilms = (idFilm) => {
        this.props.navigation.navigate("FilmDetails",{idFilm:idFilm})
    }


    render(){
        return(
            <FlatList
                  style={styles.list}
                  data={this.props.films}
                  keyExtractor={(item) => item.id.toString()}
                  extraData={this.props.favoritesFilm}
                  onEndReachedThreshold={0.5}
                  onEndReached={()=>{
                      if(!this.props.favoriteList  &&  this.page < this.totalPage){
                        this.props.load_films()
                      }
                  }}
                  renderItem={({item}) => <FilmItem 
                    film={item}
                    versDetails={this._detailsFilms}
                    favoris={this.props.favoritesFilm.findIndex(film => film.id === item.id)!== -1 ? true : false}/>} 
            />
        )
    }
}

const styles = StyleSheet.create({
    list:{
        flex:1
    }
})

const mapStateToProps = (state)=>{
    return {
        favoritesFilm:state.favoritesFilm
    }
 }
 

export default connect(mapStateToProps)(FilmList)
