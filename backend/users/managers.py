from django.contrib.auth.models import BaseUserManager

class UserManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')

        # 提取Profile相关的字段
        profile_fields = {
            'phone_number': extra_fields.pop('phone_number', ''),
            'role': extra_fields.pop('role', 1),  # 默认为Customer
        }
        
        email = self.normalize_email(email)
        user = self.model(
            email=email,
            first_name=first_name,
            last_name=last_name,
            **extra_fields
        )
        
        user.set_password(password)
        user.save(using=self._db)
        
        # 在用户创建后创建Profile
        from .models import Profile
        Profile.objects.create(
            user=user,
            **profile_fields
        )
        
        return user

    def create_superuser(self, email, first_name, last_name, password=None, **extra_fields):
        extra_fields.setdefault('role', 3)  # Manager role
        
        user = self.create_user(
            email=email,
            first_name=first_name,
            last_name=last_name,
            password=password,
            **extra_fields
        )
        return user