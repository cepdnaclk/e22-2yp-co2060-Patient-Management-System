package com.pms.backend.config;

import com.pms.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepo;
    // @RequiredArgsConstructor generates a constructor that injects userRepo
    // This is Spring Dependency Injection — Spring provides the UserRepository

    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {
        // Spring calls this with the "username" — we use email as the username.
        // Returns the User which implements UserDetails — so we return it directly.
        return userRepo.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException("No user found: " + email)
                );
    }
}
