package com.sh.db.map.bill;

import com.sh.db.map.IntEntity;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * Created by Admin on 15.03.2016.
 */

@Entity
@Table(name = "invoice",  catalog = "usercare")
public class InvoiceDTO extends IntEntity {
}
