package com.sh.db;

import org.springframework.beans.factory.annotation.Configurable;

import java.io.Serializable;

/**
 * User: Shuhrat Fayziev
 * Date: 6/5/13
 * Time: 7:00 PM
 */

@Configurable
public interface GenericDao <T, PK extends Serializable> {
    public T find(PK id);
    public void delete(T obj);
    public void saveOrUpdate(T obj);
}