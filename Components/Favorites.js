import React from 'react'
import {StyleSheet,View} from 'react-native'
import FilmList from './FilmList'
import {connect} from 'react-redux'


class Favorites extends React.Component{


    render(){
        return(
            <FilmList 
                films={this.props.favoritesFilm}
                navigation={this.props.navigation}
                favoriteList={false}
            />
        )
    }

}


const styles = StyleSheet.create({})

const mapStateToProps = (state)=>{
    return {
        favoritesFilm:state.favoritesFilm
    }
}
 
export default connect(mapStateToProps)(Favorites)