/*
 * JBILLING CONFIDENTIAL
 * _____________________
 *
 * [2003] - [2012] Enterprise jBilling Software Ltd.
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Enterprise jBilling Software.
 * The intellectual and technical concepts contained
 * herein are proprietary to Enterprise jBilling Software
 * and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden.
 */

package com.sh.utils;

import org.apache.log4j.Logger;

import java.io.PrintWriter;
import java.io.StringWriter;

public class SessionInternalError extends RuntimeException {

	private String errorMessages[] = null;
	
    public SessionInternalError() {
    }

    public SessionInternalError(String s) {
        super(s);
    }
    
    public SessionInternalError(String s, Class className, Exception e) {
        super(s);
        Logger log = Logger.getLogger(className);
        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw);
        e.printStackTrace(pw);
        pw.close();

        log.fatal(s + e.getMessage() + "\n" + sw.toString());
        
    }

    public SessionInternalError(Exception e) {
        super(e.getMessage());

        if (e instanceof SessionInternalError) {
            setErrorMessages(((SessionInternalError) e).getErrorMessages());
        }

        Logger log = Logger.getLogger("com.sh.db.map.sh");
        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw);
        e.printStackTrace(pw);
        pw.close();
        log.fatal("Internal error: " + e.getMessage() + "\n" + sw.toString());
    }

    public SessionInternalError(String message, Throwable e) {
        super(message + " Cause: " + e.getMessage(), e);
    }

    public SessionInternalError(String message, Throwable e, String[] errors) {
        super(message, e);
        setErrorMessages(errors);
    }

    public SessionInternalError(String message, String[] errors) {
        super(message);
        setErrorMessages(errors);
    }

	public void setErrorMessages(String errors[]) {
		this.errorMessages = errors;
	}

	public String[] getErrorMessages() {
		return errorMessages;
	}
}
