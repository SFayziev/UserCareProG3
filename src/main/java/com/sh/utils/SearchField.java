package com.sh.utils;

/**
 * Created by Admin on 29.09.2015.
 */
public class SearchField {
    private  String searchText;

    public SearchField(String searchText) {
        this.searchText = searchText.replaceAll("[^a-zA-Z0-9\\s]", " ").replaceAll("  ", " ") ;
    }

    public String getSearchText() {
        return searchText;
    }

    public void setSearchText(String searchText) {
        this.searchText = searchText;
    }

    public String getTextForSearch(){
        return searchText;

    }

}
