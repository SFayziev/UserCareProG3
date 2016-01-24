/*
 * Copyright (c) 2013. Transparent Language.  All rights reserved.
 */
package com.sh.utils;

/**
 * List of operating systems understood by the application.
 */
public enum OperatingSystem
{
    /**
     * A Windows operating system.
     */
    Windows,

    /**
     * A Linux operating system.
     */
    Linux;

    /**
     * Will tell you if the current operating system matches the selected enumeration, eg. Linux.isCurrentEnvironment().
     * @return true if the current environment matches the enumeration.
     */
    public boolean isCurrentEnvironment()
    {
        return System.getProperty( "os.name" ).startsWith( name() );
    }

    /**
     * Determines the current operating system.
     * @return the enumeration for the running os.
     */
    public static OperatingSystem currentEnvironment()
    {
        final OperatingSystem os;
        if ( Windows.isCurrentEnvironment() )
        {
            os = Windows;
        }
        else
        {
            os = Linux;
        }
        return os;
    }
}
