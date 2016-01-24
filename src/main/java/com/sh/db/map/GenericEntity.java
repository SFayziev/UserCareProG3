package com.sh.db.map;

import java.io.Serializable;

/**
 * Created by shuhrat on 16.08.2015.
 */
public interface GenericEntity<ID extends Serializable> {
    public abstract ID getId();
    public abstract void setId(final ID id);

}