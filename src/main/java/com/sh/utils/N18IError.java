package com.sh.utils;

/**
 * Created by Admin on 16.02.2016.
 */
public enum N18IError {

    
    DATABASE(0, "db.error", "A database error has occured."),
    DUPLICATE_USER(1, "user.exist" ,"This user already exists.");

    private final int code;
    private final String defaultValue;
    private final String n18icode;

    private N18IError(int code, String n18icode,  String defaultValue) {
        this.code = code;
        this.defaultValue = defaultValue;
        this.n18icode=n18icode;
    }

    public String getdefaultValue() {
        return defaultValue;
    }

    public int getCode() {
        return code;
    }

    public String getN18icode() {
        return n18icode;
    }

    @Override
        public String toString() {
            return code + ": " + defaultValue;
        }
    
    
}
