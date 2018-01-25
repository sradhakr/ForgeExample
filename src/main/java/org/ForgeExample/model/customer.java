package org.ForgeExample.model;

import javax.persistence.Entity;
import java.io.Serializable;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Column;
import javax.persistence.Version;
import javax.xml.bind.annotation.XmlRootElement;
import org.ForgeExample.model.Order;
import java.util.Set;
import java.util.HashSet;
import javax.persistence.OneToMany;
import javax.persistence.CascadeType;

@Entity
@Table(name = "customer")
@XmlRootElement
public class customer implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", updatable = false, nullable = false)
	private Long id;
	@Version
	@Column(name = "version")
	private int version;

	@Column(name = "custname")
	private String custname;

	@Column(name = "address")
	private String address;

	@OneToMany(cascade = CascadeType.REMOVE)
	private Set<Order> orderid = new HashSet<Order>();

	public Long getId() {
		return this.id;
	}

	public void setId(final Long id) {
		this.id = id;
	}

	public int getVersion() {
		return this.version;
	}

	public void setVersion(final int version) {
		this.version = version;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (!(obj instanceof customer)) {
			return false;
		}
		customer other = (customer) obj;
		if (id != null) {
			if (!id.equals(other.id)) {
				return false;
			}
		}
		return true;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	public String getCustname() {
		return custname;
	}

	public void setCustname(String custname) {
		this.custname = custname;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	@Override
	public String toString() {
		String result = getClass().getSimpleName() + " ";
		if (custname != null && !custname.trim().isEmpty())
			result += "custname: " + custname;
		if (address != null && !address.trim().isEmpty())
			result += ", address: " + address;
		return result;
	}

	public Set<Order> getOrderid() {
		return this.orderid;
	}

	public void setOrderid(final Set<Order> orderid) {
		this.orderid = orderid;
	}
}