let check_domain = function(email, domains) {
  for (var i in domains) {
    if (email.endsWith(domains[i])) {
        return true;
    }
  }
  return false;
}

module.exports = check_domain;
