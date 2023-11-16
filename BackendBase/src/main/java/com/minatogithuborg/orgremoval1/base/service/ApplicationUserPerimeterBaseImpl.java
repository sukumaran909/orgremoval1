package com.minatogithuborg.orgremoval1.base.service;

import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import com.vs.rappit.base.dal.providers.PersistenceType;
import com.vs.rappit.base.acl.AllowedFields;
import org.apache.commons.lang3.BooleanUtils;
import org.apache.commons.lang3.StringUtils;
import com.minatogithuborg.orgremoval1.model.Roles;
import com.vs.rappit.base.authentication.logic.AppUserPrivilegeCache;
import com.minatogithuborg.orgremoval1.model.Roles;
import org.springframework.beans.factory.annotation.Autowired;
import com.vs.rappit.springsecurity.base.authentication.WhitelistedAdminUserProvisioningService;
import java.util.Collections;

import com.vs.rappit.base.acl.IPerimeterManager;
import com.minatogithuborg.orgremoval1.base.model.ApplicationUserBase;
import com.minatogithuborg.orgremoval1.base.model.constants.ApplicationUserConstantBase;

public abstract class ApplicationUserPerimeterBaseImpl<T extends ApplicationUserBase> implements IPerimeterManager<T>, ApplicationUserConstantBase {
	
	@Autowired
	private AppUserPrivilegeCache userCache;
	
	@Autowired
	private WhitelistedAdminUserProvisioningService provisioningService;
	
	@Override
	public boolean canCreate(T model) {
		ApplicationUserBase userBase = (ApplicationUserBase) userCache.getCurrentUser();
		if(userBase!=null){
			for (String role : userBase.getUserRoles()) {
				Roles roleName = Roles.getRoleNameEnum(role);
				if (roleName != null) {	
					switch (roleName) {
						case DEVADMIN:
							return true;
						
						default:
							break;
					}
				}
			}	
			if(StringUtils.equalsIgnoreCase(userBase.getEmail(), model.getEmail()) 
					&& BooleanUtils.isTrue(userBase.isLogin())) {
				return true;
			}
			for (String role : userBase.getUserRoles()) {
				Roles roleName = Roles.getRoleNameEnum(role);
				switch (roleName) {
					case DEVADMIN:
					
					default:
						break;
				}
			}
		}if (provisioningService.isWhitelistesAdminUser(model.getEmail())) {
			return true;
		}
		return false;
	}

	@Override
	public boolean canUpdate(T model) {
		ApplicationUserBase userBase = (ApplicationUserBase) userCache.getCurrentUser();
		if (userBase != null) {
			for (String role : userBase.getUserRoles()) {
				Roles roleName = Roles.getRoleNameEnum(role);
				if (roleName != null) {	
					switch (roleName) {
						case DEVADMIN:
							return true;
						
						default:
							break;
					}
				}
			}
		}
		return false;
	}

	@Override
	public boolean canDelete(T model) {
		ApplicationUserBase userBase = (ApplicationUserBase) userCache.getCurrentUser();
		if (userBase != null) {
			for (String role : userBase.getUserRoles()) {
				Roles roleName = Roles.getRoleNameEnum(role);
				if (roleName != null) {	
					switch (roleName) {
						case DEVADMIN:
							return true;
						
						default:
							break;
					}
				}
			}
		}
		return false;
	}

	@Override
	public boolean canRead(T model) {
		ApplicationUserBase userBase = (ApplicationUserBase) userCache.getCurrentUser();
		if(StringUtils.equalsIgnoreCase(userBase.getEmail(), model.getEmail()) 
				&& BooleanUtils.isTrue(userBase.isLogin())) {
			return true;
		}
		if (userBase != null) {
			for (String role : userBase.getUserRoles()) {
				Roles roleName = Roles.getRoleNameEnum(role);
				if (roleName != null) {	
					switch (roleName) {
						case DEVADMIN:
							return true;
						
						default:
							break;
					}
				}
			}
		}
		if (provisioningService.isWhitelistesAdminUser(model.getEmail())) {
			return true;
		}
		return false;
	}

	@Override
	public String getAccessQuery(PersistenceType type) {
		return null;
	}

	@Override
	public AllowedFields getSelectFields(PersistenceType type) {
		AllowedFields allowedFields = new AllowedFields();
		ApplicationUserBase userBase = (ApplicationUserBase) userCache.getCurrentUser();
		setReadFields(userBase, allowedFields);
		setWriteFields(userBase, allowedFields);
		return allowedFields;
	}
	
	protected void setReadFields(ApplicationUserBase userBase, AllowedFields allowedFields) {
		Set<String> allowedAccessFields = new HashSet<>();
		allowedAccessFields.addAll(getTechnicalFields());
		if(userBase!=null) {
			if(BooleanUtils.isTrue(userBase.isDevAdmin()) ||  BooleanUtils.isTrue(userBase.isLogin())) {
				allowedAccessFields.add("*");
				List<String> allowedAccessFieldList = new ArrayList<>(allowedAccessFields);
				allowedFields.setAllowedReadFields(allowedAccessFieldList);
				return;
			}
			
		}
		List<String> allowedAccessFieldList = new ArrayList<>(allowedAccessFields);
		allowedFields.setAllowedReadFields(allowedAccessFieldList);
	}
	protected void setWriteFields(ApplicationUserBase userBase, AllowedFields allowedFields) {
		Set<String> allowedAccessFields = new HashSet<>();
		allowedAccessFields.addAll(getTechnicalFields());
		if(userBase!=null){
			if(BooleanUtils.isTrue(userBase.isDevAdmin())) {
				allowedAccessFields.add("*");
				List<String> allowedAccessFieldList = new ArrayList<>(allowedAccessFields);
				allowedFields.setAllowedWriteFields(allowedAccessFieldList);
				return;
			}
			
			
			if (provisioningService.isWhitelistesAdminUser(userBase.getEmail()) ||  BooleanUtils.isTrue(userBase.isLogin())) {
				allowedAccessFields.add("*");
				List<String> allowedAccessFieldList = new ArrayList<>(allowedAccessFields);
				allowedFields.setAllowedWriteFields(allowedAccessFieldList);
				return;
			}
		}
		List<String> allowedAccessFieldList = new ArrayList<>(allowedAccessFields);
		allowedFields.setAllowedWriteFields(allowedAccessFieldList);
	}
	protected List<String> getTechnicalFields() {
		String[] technicalFields = {"sid", "createdBy", "createdDate", "modifiedBy", "modifiedDate", "recDeleted", "isLogin", "emailInLowerCase", "userPreference", "devAdmin", "userRoles"};
		List<String> technicalFieldList =  new ArrayList<>();
		Collections.addAll(technicalFieldList, technicalFields);
		return technicalFieldList;
	}
	
	
}