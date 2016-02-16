package com.sh.utils.exception;

/**
 * Created by Admin on 16.02.2016.
 */
public enum N18IErrorCodes implements N18nLoggable{

    
    DATABASE(0, LoggingLevel.DEVELOPMENT, "db.error","DB error ", "A database error has occured."),
    DUPLICATE_USER(1, LoggingLevel.DEVELOPMENT, "user.exist" , "user exists", "This user already exists."),
    AJAX_YOU_MUST_SIGNIN(201,LoggingLevel.DEVELOPMENT, "ajax.signin"," Sign in", "You should sign in." ),
    VOTE_DISABLED(210,LoggingLevel.DEVELOPMENT, "vote.disabled","Vote", "Voting is disabled." ),
    VOTE_POSITIVE(211,LoggingLevel.DEVELOPMENT, "vote.positive.only","Vote", "Positive vote only." ),
    ARTICLE_NOT_FOUND(301,LoggingLevel.DEVELOPMENT, "article.not.found","Article", "Article not found." )

    ;


    /**
     * Numeric message code -- must be unique.
     */
    private final int Code;

    /**
     * What message level the message is associated with.
     */
    private final LoggingLevel Level;

    /**
     * Contains the message text.
     */
    private final String Message;

    private final String N18nCode;

    private  final  String DefaultValue;



    N18IErrorCodes(int theCode, LoggingLevel theLevel, String theN18nCode, String theMessage, String theDefaultValue) {
        this.Code = theCode;
        this.Level = theLevel;
        this.Message = theMessage;
        DefaultValue= theDefaultValue;
        this.N18nCode=theN18nCode;
    }

    @Override
    public int getCode() {
        return Code;
    }

    @Override
    public LoggingLevel getLevel() {
        return Level;
    }

    @Override
    public String getMessage() {
        return Message;
    }

    @Override
    public String getN18nCode() {
        return N18nCode;
    }

    @Override
    public String getDefaultValue() {
        return DefaultValue;
    }

    @Override
        public String toString() {
            return Code + ": " + Message;
        }
    
    
}
