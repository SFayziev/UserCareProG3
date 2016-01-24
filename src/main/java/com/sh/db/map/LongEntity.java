package com.sh.db.map;

import javax.persistence.*;

/**
 * Created by shuhrat on 16.08.2015.
 */
@MappedSuperclass
public abstract class LongEntity implements GenericEntity<Long> {

    @Id
    @Column(name = "id")
    @GeneratedValue( strategy= GenerationType.AUTO )
    protected Long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
