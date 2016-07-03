package com.sh.utils;

import org.junit.Test;

import java.util.Date;

import static org.junit.Assert.*;

/**
 * TimeAgoTest UnitTest
 * Created by Lenovo on 26.06.2016.
 */
public class TimeAgoTest {

    @Test
    public final void testGetI18nvalue() throws Exception {
        System.out.println("TimeAgo class unitTest");
        TimeAgo timeAgo = new TimeAgo(new Date());
        assertNotNull(timeAgo.getI18nvalue());
        assertNotNull(timeAgo.getAgovalue());
    }


}